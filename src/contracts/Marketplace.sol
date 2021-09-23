pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract Marketplace is ERC721 , Ownable{
    uint public productCount = 0;
    mapping(uint => Product) public products;

    struct Product {
        uint id;
        string name;
        string image;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        string image,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        string image,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor () ERC721("CryptoPuppy", "CPUP") public {
    }

    function createProduct(string memory _name, string memory _image, uint _price, address marketContract) public {
        // Require a valid name
        require(bytes(_name).length > 0,'Require a valid name');
        // Require a valid price
        require(_price > 0,'Require a valid price');
        // Increment product count
        productCount ++;

        _mint(msg.sender, productCount);
        _setTokenURI(productCount, _image);
        approve(marketContract, productCount);

        // Create the product
        products[productCount] = Product(productCount, _name, _image, _price,  msg.sender, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _image,_price,  msg.sender, false);
    }

    function purchaseProduct(uint _id , address marketContract) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount,'Make sure the product has a valid id');
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price, 'Require that there is enough Ether in the transaction');
        // Require that the product has not been purchased already
        require(!_product.purchased, 'Require that the product has not been purchased already');
        // Require that the buyer is not the seller
        require(_seller != msg.sender, 'Require that the buyer is not the seller');
        // Transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product
        products[_id] = _product;
        // Pay the seller by sending them Ether
        _seller.transfer(msg.value);
        // Trigger an event
        Marketplace mp = Marketplace(marketContract);
        mp.safeTransferFrom(_seller, msg.sender, _id);

        emit ProductPurchased(productCount, _product.name, _product.image,_product.price, msg.sender, true);
    }
}
