const fs = require('fs');
const colors = require('colors');


let listadoPorHacer = [];

const guardarDataBase = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err)
            throw new Error('No se puede guardar', err);
    });
}


const cargarDataBase = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];

    }


}

const crear = (descripcion) => {

    cargarDataBase();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDataBase();

    return porHacer;

}

const getListado = () => {

    cargarDataBase();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDataBase();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDataBase();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDataBase();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDataBase();
        return true;
    }

    return false;

}




module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}