import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'IMAGE';

const DraggableImage = ({ image, index, moveImage, removeImage }) => {
    const [, ref] = useDrag({
        type: ItemType,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (item) => {
            if (item.index !== index) {
                moveImage(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => ref(drop(node))}
            className='relative'
        >
            <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                className='w-28 h-28 object-cover rounded-xl'
            />
            <FaTrashAlt
                onClick={() => removeImage(image)}
                className='absolute top-1 right-1 text-white hover:text-red-700 cursor-pointer'
            />
        </div>
    );
};

const ImageUploader = ({ onImagesSelect, imagee }) => {
    const [images, setImages] = useState([]);
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
        onImagesSelect([...images, ...files]); // Notify parent component of the new selected images
    };

    const handleRemoveImage = (imageToRemove) => {
        setImages((prev) => prev.filter(image => image !== imageToRemove));
        onImagesSelect(images.filter(image => image !== imageToRemove));
    };

    const moveImage = (fromIndex, toIndex) => {
        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        setImages(updatedImages);
        onImagesSelect(updatedImages);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='rounded-xl mt-5 border border-slate-300 p-5 h-fit lg:w-[500px] border-3'>

                <div className=' flex justify-between items-center'>
                    <div className='font-bold'>Product Media</div>
                    <label htmlFor='photo' className={`bg-orange-400 ${images.length > 0 ? '' : 'hidden'} hover:bg-orange-500 p-1 text-sm rounded-lg cursor-pointer`}>
                        Add Images
                    </label>
                </div>
                <div className='lg:p-10 p-8 mt-2 rounded-xl border-2 border-dashed border-slate-300'>
                    {images.length === 0 && (
                        <label htmlFor='photo' className='bg-orange-400 hover:bg-orange-500 p-2 ml-20 text-[sm] rounded-lg cursor-pointer'>
                            Add Images
                        </label>
                    )}
                    <div className='flex flex-wrap justify-center gap-2'>
                        {images.map((image, index) => (
                            <DraggableImage
                                key={index}
                                image={image}
                                index={index}
                                moveImage={moveImage}
                                removeImage={handleRemoveImage}
                            />
                        ))}
                    </div>

                    <input
                        type="file"
                        id='photo'
                        name='photo'
                        className='hidden'
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </DndProvider>
    );
};

export default ImageUploader;
