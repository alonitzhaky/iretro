import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getAllProductsInCategoryAsync, selectCount, selectCurrentPage, updateCurrentPage } from '../Products/productSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';

export default function BasicPagination() {
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(selectCurrentPage)
  const count = useAppSelector(selectCount)
  let { id } = useParams()

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(updateCurrentPage(value))
    dispatch(getAllProductsInCategoryAsync({ id: Number(id), page: value }))
  }
  return (
    <Stack spacing={2}>
      <br />
      <Pagination page={currentPage} count={Math.ceil(count / 3)} color="standard" onChange={handleChange} />
    </Stack>
  );
}