import React, {useEffect, useState} from 'react';
import './List.scss'
import Card from "../Card/Card";
import productsData from '../../assets/products.json';

function List({selectedBrands, currentPage, itemsPerPage}) {
    const [data, setFilteredData] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const filteredData = productsData.filter(item => selectedBrands.includes(item.brand.toString())).slice(startIndex, endIndex);
        setFilteredData(filteredData);
    }, [selectedBrands, currentPage, itemsPerPage]);

    return (
        <div className='list'>
            {data?.map(item => <Card item={item} key={item.id} />)}
        </div>
    );
}


export default List;