import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'

const AddProduct = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState("")
    // Category - Which function to use? 
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")    
return (
    <div>AddProduct</div>
  )
}

export default AddProduct