import { Sequelize, DataTypes } from "sequelize";

const db = new Sequelize ({
    dialect: "sqlite",
    storage: "./database.sqlite"
});


const Usuario = db.define("Usuario", {
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }

});

const Perfil = db.define("Perfil", {
    nombre: {
        type: DataTypes.STRING
    },
   
    telefono: {
        type: DataTypes.STRING
    },
    direnvio: {
        type: DataTypes.STRING
    },
    dirfactura: {
        type: DataTypes.STRING
    },
    politicapriv: {
        type: DataTypes.STRING
    }
});

const Producto = db.define("Producto", {
    nombre: {
        type: DataTypes.STRING
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    
    preciocompra: {
        type: DataTypes.DECIMAL
    },
    precioventa: {
        type: DataTypes.DECIMAL
    },
    iva: {
        type: DataTypes.DECIMAL
    }
});

const Contacto = db.define("Contacto", {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    mensaje: {
        type: DataTypes.STRING
    }

});


Usuario.hasOne(Perfil);
Perfil.belongsTo(Usuario);

Usuario.hasMany(Producto);
Producto.belongsTo(Usuario);



await db.sync()
// solo para crear la base de datos 
//await db.sync({alter: true})

export {
    Usuario,
    Perfil,
    Producto,
    Contacto
}