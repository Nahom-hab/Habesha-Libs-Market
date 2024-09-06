import { errorHandeler } from "../utils/ErrorHandler.js";
import Element from "../models/elementsModel.js";

export const getElements = async (req, res, next) => {
    try {
        const foundElement = await Element.findById('66dad5507eb83e4c8a1b33ce');
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
    const predefinedId = '66dad5507eb83e4c8a1b33ce'; // Use your predefined ID here

    try {
        // Find the element by predefined ID
        const foundElement = await Element.findById(predefinedId);
        if (!foundElement) {
            return res.status(404).json({ message: 'Element not found' });
        }

        // Update the found element with `updatedElements` data
        Object.assign(foundElement, updatedElements);

        // Save the updated element
        await foundElement.save();
        res.status(200).json(foundElement);
    } catch (error) {
        console.error(error.message);
        next(errorHandler(500, 'Internal Server Error')); // Ensure `errorHandler` is properly defined and imported
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
