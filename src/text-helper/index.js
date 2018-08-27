module.exports = {
	truncate: function (yourString, maxLength = 80) {

		if (yourString.length <= maxLength) {
			return yourString;
		}

		var trimmedString = yourString.substr(0, maxLength);

		trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

		trimmedString += ' ...';

		return trimmedString;
	}
}


