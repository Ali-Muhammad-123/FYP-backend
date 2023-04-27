const Company = require("../models/company");
const IncorporationCertificate = require("../models/IncorporationCertificate");
const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");
const OfficeLeaseAgreement = require("../models/OfficeLeaseAgreement");
const ShareCertificate = require("../models/ShareCertificate");
const ImmigrationCard = require("../models/Advisor");

class GetCompanyController {
	static async Execute(req, res) {
		const { company } = req.query;
		if (company != undefined && company.match(/^[0-9a-fA-F]{24}$/)) {
			var incorporationCertificate = await IncorporationCertificate.find({
				company: company,
			});

			var articlesOfIncorporation = await ArticlesOfIncorporation.find({
				company: company,
			});

			var agreements = await OfficeLeaseAgreement.find({
				company: company,
			});

			var shareCertificate = await ShareCertificate.find({
				company: company,
			});

			var immigrationCard = await ImmigrationCard.find({
				company: company,
			});

			res.status(200).json({
				message: "success",
				incorporationCertificate: incorporationCertificate,
				articlesOfIncorporation: articlesOfIncorporation,
				agreements: agreements,
				shareCertificate: shareCertificate,
				immigrationCard: immigrationCard,
			});
		} else {
			res.status(404).json({
				message: "invalid request",
			});
		}
	}
}

module.exports = GetCompanyController;
