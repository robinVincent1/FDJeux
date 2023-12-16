const {Jour,Creneau,PlanningGeneralLigne} = require('../models');

const addJour = async (req, res) => {
    try {
        const jour = await Jour.create({
            nom: req.body.nom,
            list_horaire: req.body.list_horaire,
        });
        res.send(jour);
    } catch (error) {
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const addJourHoraire = async (req, res) => {
    try {
        const jour = await Jour.findOne({
            where: {
                nom: req.body.nom,
            }
        });
        const nbligne=await PlanningGeneralLigne.count();
        for (let i = 0; i < nbligne; i++) {
            const creneau = await Creneau.create({
                idPlanningGeneralLigne: i,
                ouvert: false,
                horaire: req.body.horaire,
                jour: req.body.nom,
                titre: req.body.titreligne,
                nb_max: 0,
                nb_inscrit: 0,
                referent: null,
            });
        }
        jour.list_horaire.push(req.body.horaire);
        jour.save();
        res.send(jour);
    } catch (error) {
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const deletejour = async (req, res) => {
    try {
        const jour = await Jour.findOne({
            where: {
                nom: req.body.nom,
            }
        });
        jour.destroy();
        res.send(jour);
    } catch (error) {
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const deletejourhoraire = async (req, res) => {
    try {
        const jour = await Jour.findOne({
            where: {
                nom: req.body.nom,
            }
        });
        const nbligne=await PlanningGeneralLigne.count();
        for (let i = 0; i < nbligne; i++) {
            const creneau = await Creneau.findOne({
                where: {
                    idPlanningGeneralLigne: i,
                    horaire: req.body.horaire,
                    jour: req.body.nom,
                }
            });
            creneau.destroy();
        }
        jour.list_horaire.splice(jour.list_horaire.indexOf(req.body.horaire),1);
        jour.save();
        res.send(jour);
    } catch (error) {
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

const modifyjourhoraire = async (req, res) => {
    try {
        const jour = await Jour.findOne({
            where: {
                nom: req.body.nom,
            }
        });
        const nbligne=await PlanningGeneralLigne.count();
        for (let i = 0; i < nbligne; i++) {
            const creneau = await Creneau.findOne({
                where: {
                    idPlanningGeneralLigne: i,
                    horaire: req.body.horaire,
                    jour: req.body.nom,
                }
            });
            creneau.horaire=req.body.newhoraire;
            creneau.save();
        }
        jour.list_horaire.splice(jour.list_horaire.indexOf(req.body.horaire),1,req.body.newhoraire);
        jour.save();
        res.send(jour);
    } catch (error) {
        console.log(error);
        res.status(400).send({errors: error.message});
    }
}

module.exports = {addJour,addJourHoraire,deletejour,deletejourhoraire,modifyjourhoraire}