import Supplier from "../models/SupplierModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getSuppliers = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Supplier.findAll({
                attributes:['uuid','name','pdv','email','phoneNumber', 'contactPerson'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Supplier.findAll({
                attributes:['uuid','name','pdv','email','phoneNumber','contactPerson'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getSupplierById = async(req, res) =>{
    try {
        const supplier = await Supplier.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!supplier) return res.status(404).json({msg: "Podaci nisu pronađeni"});
        let response;
        if(req.role === "admin"){
            response = await Supplier.findOne({
                attributes:['uuid','name','pdv','email','phoneNumber',' contactPerson'],
                where:{
                    id: supplier.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Supplier.findOne({
                attributes:['uuid','name','pdv','email','phoneNumber',' contactPerson'],
                where:{
                    [Op.and]:[{id: supplier.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createSupplier = async(req, res) =>{
    const {name,pdv,email,phoneNumber, contactPerson} = req.body;
    try {
        await Supplier.create({
            name: name,
            pdv: pdv,
            email: email,
            phoneNumber: phoneNumber,
            contactPerson: contactPerson,
            userId: req.userId
        });
        res.status(201).json({msg: "Supplier created"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateSupplier = async(req, res) =>{
    try {
        const supplier = await Supplier.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!supplier) return res.status(404).json({msg: "Podaci nisu pronađeni"});
        const {name,pdv,email,phoneNumber, contactPerson} = req.body;
        if(req.role === "admin"){
            await Supplier.update({name,pdv,email,phoneNumber, contactPerson},{
                where:{
                    id: Supplier.id
                }
            });
        }else{
            if(req.userId !== supplier.userId) return res.status(403).json({msg: "Zabranjeni pristup"});
            await Supplier.update({name,pdv,email,phoneNumber, contactPerson},{
                where:{
                    [Op.and]:[{id: supplier.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Supplier updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteSupplier = async(req, res) =>{
    try {
        const supplier = await Supplier.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!supplier) return res.status(404).json({msg: "Podaci nisu pronadjeni"});
        const {name,pdv,email,phoneNumber, contactPerson} = req.body;
        if(req.role === "admin"){
            await Supplier.destroy({
                where:{
                    id: supplier.id
                }
            });
        }else{
            if(req.userId !== supplier.userId) return res.status(403).json({msg: "Zabranjeni pristup"});
            await Supplier.destroy({
                where:{
                    [Op.and]:[{id: supplier.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Supplier deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}