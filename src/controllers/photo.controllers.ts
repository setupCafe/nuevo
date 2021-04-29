import {Request, Response} from 'express';
import Photos from '../models/Photos';
import path from 'path';
import fs from 'fs-extra'


export async function getPhotos(req: Request, res:Response):Promise<Response>{
    const photos = await  Photos.find();
    return res.json(photos)
}

export async function getPhoto(req: Request, res:Response):Promise<Response>{
    const {id} = req.params
    const photo = await Photos.findById(id)
    return res.json(photo)
}

export async function createPhoto(req: Request, res:Response):Promise<Response>{
    const {title, description} = req.body;
    const newPhoto = {
        title: title,
        description: description,
        imagePath:req.file.path

    };
    const photo = new Photos(newPhoto);
    await photo.save()
    console.log(photo)

    return res.json({
        message: 'photo successfully saved',
        photo
    })
}

export async function deletePhoto(req: Request, res: Response):Promise<Response>{
    const {id} = req.params
    const photo  = await Photos.findByIdAndDelete(id)
    if (photo)
        await fs.unlink(photo.imagePath)

    return res.json({
        message: 'photo borrada correctamente',
        photo
    })
}

export async function updatePhoto(req:Request, res:Response):Promise<Response>{
    const {id} = req.params
    const {title, description} = req.body
    const updatedPhoto = await Photos.findByIdAndUpdate(id,{
        title,
        description
    },{new: true})
    return res.json({
        message: "Successfully Updated",
        updatedPhoto
    })
}