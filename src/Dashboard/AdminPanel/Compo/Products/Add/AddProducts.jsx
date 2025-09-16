import React, { useState } from 'react';
import ProductBasicInfo from './Components/ProductBasicInfo';
import PotterySpecifications from './Components/PotterySpecification';
import InventoryAndImages from './Components/InventoryAndImg';
import CategorySelector from './Components/CategoriesSelect';
import axios from 'axios';
import { AuthAction } from '../../../../../CustomStateManage/OrgUnits/AuthState';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
    const {token} = AuthAction.getState('sunState');
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        category_id: '',
        subcategory_id: '',
        name: '',
        description: '',
        clay_type: 'earthenware',
        firing_method: 'electric',
        glaze_type: '',
        dimensions: '',
        weight: '',
        price: '',
        discount_percent: '0',
        stock_quantity: '',
        is_fragile: true,
        is_handmade: true,
        color: '',               // new field
        youtube_link: '',        // new field
        images: [],
    });

    const goToNextStep = () => {
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleFormSubmit = async (productData) => {
        try {
            const formData = new FormData();

            // Append all non-file fields
            for (let key in productData) {
                if (key !== 'images') {
                    formData.append(key, productData[key]);
                }
            }

            // Append images
            productData.images.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });

            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            const res = await axios.post('/api/admin/add-product', formData, {
            headers: {
                Authorization: `Bearer ${token}`, // if needed
            },
            withCredentials: true, // important for Safari
            });
            if(res.data.status == 200){
                navigate('/admin/view-product');
            }
            console.log(res.data);
            alert('Product submitted successfully!');
        } catch (err) {
            console.error(err);
            // alert('Something went wrong!');
        }
    };
    console.log(productData);

    return (
        <div className="container my-5">
                    {currentStep === 1 && (
                        <>
                        <div className="row justify-content-start">
                            <div className="col-lg-5 mx-4">
                                <label className="form-label fw-bold">Select Category</label>
                                <CategorySelector
                                productData={productData}
                                setProductData={setProductData}
                                />
                            </div>
                        </div>

                        <ProductBasicInfo
                            productData={productData}
                            setProductData={setProductData}
                        />

                        </>
                    )}

                    {currentStep === 2 && <PotterySpecifications  
                        productData={productData}
                        setProductData={setProductData} />
                    }

                    {currentStep === 3 && <InventoryAndImages 
                        productData={productData}
                        setProductData={setProductData}/>
                    }

                    <div className="d-flex justify-content-between mt-4">
                        {currentStep > 1 && (
                        <button className="btn btn-outline-secondary" onClick={goToPreviousStep}>
                            Back
                        </button>
                        )}
                        {currentStep < 3 ? (
                        <button className="btn btn-primary ms-auto" onClick={goToNextStep}>
                            Next
                        </button>
                        ) : (
                       <button className="btn btn-success ms-auto" onClick={() => handleFormSubmit(productData)}>
                            Submit
                        </button>
                        )}
                    </div>
        </div>  
    );
};

export default AddProducts;
