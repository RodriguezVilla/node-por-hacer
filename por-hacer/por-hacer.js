const fs = require('fs');

let listadoPorHacer = [];

const guardaDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se puedo grabar, err');
    });

}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];

    }
}


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardaDB();

    return porHacer;
}

const getListado = () => {

    cargarDB();
    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardaDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });
    if (listadoPorHacer.length === nuevoListado.length)
        return false;
    else {
        listadoPorHacer = nuevoListado;
        guardaDB();
        return true;
    }
}

//     cargarDB();
//     let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
//     if (index >= 0) {
//         delete listadoPorHacer[index];
//         guardaDB();
//         return true;
//     } else {
//         return false;
//     }
// }

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}