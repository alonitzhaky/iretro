import React, {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getAllProductsInCategoryAsync, selectCount } from '../Products/productSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';

export default function BasicPagination() {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    let { id } = useParams()
    const [page, setPage] = useState(1)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)

        dispatch(getAllProductsInCategoryAsync({id: Number(id), page: value }))
    }
    
    return (
    <Stack spacing={2}>
      <Pagination count={Math.ceil(count)} color="standard" onChange={handleChange} />
    </Stack>
  );
}