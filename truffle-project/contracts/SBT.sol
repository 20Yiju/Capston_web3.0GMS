// ipfs://bafkreic6ov4qo4ucd4g4uuyve4h72nc4y2lg7ugtq3n3vxnfp3lojvtmdu

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract SBT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Web3 Club Tour", "W3CT") {}

    
    mapping(uint256 => bool) _locked;

    
    mapping(address => uint256) private _balances;


    event Locked(uint256 tokenId);


    function locked(uint256 tokenId) external view returns (bool) {
        //require(ownerOf(tokenId) != address(0));
        return _locked[tokenId];
    }
    
    /**function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _locked[tokenId] = true;
        emit Locked(tokenId);
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }*/

function safeMint(address to, string memory uri) public onlyOwner returns (uint256) {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();

    _locked[tokenId] = true;
    emit Locked(tokenId);

    _safeMint(to, tokenId);
    _setTokenURI(tokenId, uri);
    emit Transfer(address(0), to, tokenId); // Transfer 이벤트 발생

    return tokenId;
}


    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Only owner of the token can burn it");
        _burn(tokenId);
    }

    function revoke(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }

    modifier IsTransferAllowed(uint256 tokenId) {
        require(_locked[tokenId] == false, "Not allowed to transfer token");
        _;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual override IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual override IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override IsTransferAllowed(tokenId) {
        super.safeTransferFrom(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
        return tokenOfOwnerByIndex(owner, index);
    }

    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owner];
    }

    function getTotalTokenIdFromOwner(address owner) public view returns (uint256[] memory) {
        uint256 totalToken = _tokenIdCounter.current();
        uint256[] memory tokenIds = new uint256[](totalToken);
        uint256 j = 0;

        for (uint256 i = 0; i < totalToken; i++) {
            if (owner == ownerOf(i)) {
                tokenIds[j] = i;
                j++;
            }
        }

        // Create a new dynamic array with the correct length
        uint256[] memory finalTokenIds = new uint256[](j);
        
        // Copy the non-zero elements from tokenIds to finalTokenIds
        for (uint256 k = 0; k < j; k++) {
            finalTokenIds[k] = tokenIds[k];
        }

        return finalTokenIds;
    }
}
