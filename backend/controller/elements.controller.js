import { errorHandeler } from "../utils/ErrorHandler.js";
import Element from "../models/elementsModel.js";

export const getElements = async (req, res, next) => {
    try {
        const foundElement = await Element.findById('66cd59148e18c33e046a937b');
        if (!foundElement) {
            return res.status(404).json('No elements found');
        }
        res.status(200).json(foundElement);
    } catch (error) {
        console.log(error.message);
        next(errorHandeler(500, 'Internal Server Error'));
    }
};

export const UpdateElements = async (req, res, next) => {
    const updatedElements = req.body;
    try {
        const foundElement = await Element.findById('66cd59148e18c33e046a937b');
        if (!foundElement) {
            return res.status(404).json('No elements found');
        }
        // Assuming you want to update the found element with `updatedElements` data
        Object.assign(foundElement, updatedElements);
        await foundElement.save();
        res.status(200).json(foundElement);
    } catch (error) {
        console.log(error.message);
        next(errorHandeler(500, 'Internal Server Error'));
    }
};

export const addElements = async (req, res, next) => {
    try {
        const newElement = await Element.create(req.body);
        res.status(201).json(newElement);
    } catch (error) {
        console.log(error.message);
        next(errorHandeler(500, 'Internal Server Error'));
    }
};
