const argon = require("argon2");
const uuid = require("uuid");

async function Hash(input) {
	var hash = await argon.hash(input, { type: argon.argon2id, timeCost: 5, hashLength: 64 });
	return hash;
}

async function CheckHash(hash, input) {
	var result = await argon.verify(hash, input);
	return result;
}

function GetUUID() {
	return uuid.v1();
}

module.exports.GetUUID = GetUUID;
module.exports.CheckHash = CheckHash;
module.exports.Hash = Hash;
