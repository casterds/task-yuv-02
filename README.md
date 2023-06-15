

# About


Turn-based fantasy campaign game powered by Chainlink VRF and user imagination,



# How it works

First the user selects and mints a new character (as an NFT), then starts the campaign.

As the user progresses through the maze they will eventually hit a spawn point. The frontend then call the smart contract to ask for new (random) turn. The contract then requests a random value from the oracle (this is shown as the "Dracon consults its oracle modal")  which itself then calls the contract after a period of time, at which point the contract emits a turn event. The frontend code responds to that event and checks what type of screen to display to the user - battle or loot.

In battle mode, for each turn the user requests a random result from the contract which determines the damage to them and their enemy. Once the enemy has been defeated, the user returns to navigating a maze.

If the user has acquired the magic weapon, once they get to the door the frontend checks (using a zkSNARK verifier) that they have indeed got to that point without teleporting or working through walls. If it's valid, the door to Draco's lair is opened. As the user passes through the door, the ZKP is verified in the smart contract and if that's ok they can finally battle Draco.



# Controls

`w` - forward

`s` - backwards

`a` - strafe left

`d` - strafe left

`[` - turn left

`]` - turn right





# Task

- Contracts are deployed in the both in the networks Mantle and Aurora testnets.
- In the front-end Network choose option are added and switch network and add to network in metamask functions are implemented.
- In account abstraction, I am facing the issue, contracts are deployed, entry point and smart wallert contract in local I tried the eth transfer also, when i integrate the @aacout/abstraction/SDK files in front-end here networks are not supported Aurora/Mantle testnet, I analysed some third party SDK also like alchemey, biconmy sdk, etc., here also not supported to Auora Testnet/Mantle Testnet.


# Aurora testnet

Fantasy character: 0x06502A1b2cC2417f05485EC4dFc7D8eCF0b944e7
FantasyAttributesManager: 0xE034714bdd3176D7C7f3b4Dc931e0867309589e6
Mock VRF: 0xE8F4d23aB2c59382f5A49CBBfE5668aFa33dF1a2
Verifier: 0x34464A9C91229B1cFfAB946E95af3c0f8caeC2f6
CastleCampaign: 0x7AA41F2828C68af97D4962C2Ed40B8C20A133A72


# Mantle testnet

Fantasy character: 0xc1c0375783B3cf13770DC4Cf8b78bA9176872e4e
FantasyAttributesManager: 0x60a6EE52EcEabA4186aA01302b81de7210215269
Mock VRF: 0xBBa3cC982a8122D4f2C463842cC352Db0F5CEDA2
Verifier: 0xCcF574D920DF9306abb5869988e98EC8eeC2FEFd
CastleCampaign: 0x113Ae457F58E813C8A23f64E62D88B3a9DCCF3B3
