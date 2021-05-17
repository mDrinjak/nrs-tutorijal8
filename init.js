const db = require('./db/db');

db.sequelize.sync({ force: true }).then(function () {
    dataInit().then(() => {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function dataInit() {
    const gradoviPromiseList = [
        db.gradovi.create({id: 1, naziv: 'Zenica',broj_stanovnika: 20000}),
        db.gradovi.create({id: 2, naziv: 'Sarajevo',broj_stanovnika: 55000}),
        db.gradovi.create({id: 3, naziv: 'Bec',broj_stanovnika: 7777777})
    ];
    
    return new Promise((resolve, reject) => {
        Promise.all(gradoviPromiseList)
            .catch(reason => reject(reason));
    });
}