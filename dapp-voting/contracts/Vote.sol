// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Vote {
    
    struct Option {
        uint8 id;
        string name;
        uint64 voteCount;
    }

    uint8 public totalOptions;

    mapping(uint8 => Option) public options;
    mapping(address => bool) public voters;

    string private constant OPTION_NOT_EXIST = "Cette option n'existe pas";
    string private constant ALREADY_VOTED = "Vous ne pouvez plus voter";

    constructor() {
        addOption("Vote blanc");
        addOption("Oui");
        addOption("Non");
    }

    function addOption(string memory _name) private {
        options[totalOptions] = Option(totalOptions, _name, 0);
        totalOptions++;
    }

    function vote(uint8 _optionId) public {
        require(_optionId < totalOptions, OPTION_NOT_EXIST);
        require(!voters[msg.sender], ALREADY_VOTED);
        voters[msg.sender] = true;
        options[_optionId].voteCount++;
    }

    function getOption(uint8 _optionId) public view returns (uint8 id, string memory name, uint64 voteCount) {
        require(_optionId < totalOptions, OPTION_NOT_EXIST);
        Option memory option = options[_optionId];
        return (option.id, option.name, option.voteCount);
    }

    function getOptions() public view returns (Option[] memory) {
        Option[] memory optionsArray = new Option[](totalOptions);
        for (uint8 i = 0; i < totalOptions; i++) {
            optionsArray[i] = options[i];
        }
        return optionsArray;
    }
}
