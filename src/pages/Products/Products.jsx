import React, {useState} from 'react';
import './Products.scss'
import List from "../../components/List/List";
import productsData from '../../assets/products.json';
import brandsData from '../../assets/brands.json';
const Products = () => {
    const initialBrands = [...brandsData.map(brand=>(brand.id).toString())];
    const [selectedBrands, setSelectedBrands] = useState(initialBrands);
    const [preselectedBrands, setPreselectedBrands] = useState(selectedBrands);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6

    const handleChange = (e)=>{
        const value = e.target.value
        const isChecked = e.target.checked
        setPreselectedBrands(isChecked?[...preselectedBrands,value]:preselectedBrands.filter(item=>item!==value))
    }

    const handleFilter = ()=>{
        setSelectedBrands(preselectedBrands)
    }

    const resetFilters = () => {
        setPreselectedBrands(initialBrands);
        setSelectedBrands(initialBrands);
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = true;
        });
    }
    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    };
    const handleGoBack = () => {
        setCurrentPage(currentPage -1);
    };

    return (
        <div className='products'>
            <div className='left'>
                <div className='filterItem'>
                    <h2>Brands</h2>
                    {
                        brandsData.map(brand=>{
                            return(
                                <div className='inputItem'>
                                    <label className="container">
                                    <input type='checkbox' defaultChecked='checked' id={brand.id} value={brand.id} onChange={handleChange}/>
                                    <label htmlFor='table'>{brand.title}</label>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='buttons'>
                    <button className='apply' onClick={handleFilter}>Apply Filter</button>
                    <button className='reset' onClick={resetFilters}>✕ <span>Reset</span></button>
                </div>
            </div>
            <div className='right'>
                <List data={productsData} selectedBrands={selectedBrands} currentPage={currentPage} itemsPerPage={itemsPerPage} />
            <div className='buttons'>
                {currentPage * itemsPerPage < productsData.length && (
                    <button className='navigation' onClick={handleLoadMore}>Load More</button>
                )}
                {currentPage * itemsPerPage > productsData.length && (
                    <button className='navigation' onClick={handleGoBack}>Go Back</button>
                )}
            </div>
            </div>

        </div>
    );
};

export default Products;
