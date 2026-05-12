import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LightBox from '../Components/LightBox'
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import CustomLoader from '../Components/CustomeLoader';
import { getProductDataActionInitiate } from '../redux/actions/getProductAction';
import { postProductDataActionInitiate } from '../redux/actions/addProductAction';
import { Theme } from '../GlobalStyles';
import StarRating from '../Components/StarRating';
import CheckIcon from "@mui/icons-material/Check";

const ProductDetails = () => {
    const { Id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false);

    const getproductsdata = useSelector((state) => state.getproductdata);
    const d = getproductsdata?.data;
    console.log(d, "nagendra product details ra")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getProductDataActionInitiate());
            setLoading(false)

        };

        fetchData();
        window.scrollTo(0, 0);
    }, [dispatch]);

    useEffect(() => {
        if (d && d.length > 0) {
            setData(d);
        }
    }, [d]);


    const item = data.find(product => String(product.id) === String(Id));
    console.log(item)
    if (!item) {
        return <p>Product not found!</p>;
    }

    const addToCart = async () => {
        const productData = {
            name: item.name,
            price: item.MRP,
            image: item.src,
            description: item.description,
            offer: item.off,
        };
        setLoading(true)
        await dispatch(postProductDataActionInitiate(productData));
        setLoading(false)
        navigate('');

    };
    return (
        <Box sx={{height:'90vh'}}>
            <CustomLoader open={loading} message="Loading product..." />

            <Box>
                <img src="https://res.cloudinary.com/dam89m7fe/image/upload/v1778562014/pdimg1_dfadnx.avif" alt="" width={'100%'} />
            </Box>
            <Grid container sx={{mt:2}}>
                <Grid item xs={12} sm={6} md={6}>
                    <LightBox item={item} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography sx={{...Theme.headings}}>{item.Name}</Typography>

                  <Box sx={{display:'flex',pt:1.5}}>
                          <StarRating rating={item.Rating} /> <Typography sx={{...Theme.font16SemiBold,pl:1}}>1773 Reviews</Typography>
                  </Box>
                   <Box sx={{mt:2}}>
                    <Typography variant='body1' sx={{...Theme.font16SemiBold}}>{item.des1}</Typography>
                   </Box>
                   <Box sx={{mt:2}}>
                    <Typography varient="p" sx={{...Theme.font16SemiBold}}>{item.des2}</Typography>
                   </Box>
                   <Box sx={{display:'flex',mt:1.5}}>
                   <Box>
                    <CheckIcon sx={{fontSize:'20px'}}/>
                    <Typography variant='span' sx={{ml:.7,...Theme.font15Regular}} >Fragrance free </Typography>
                   </Box>
                    <Box sx={{ml:5}}>
                    <CheckIcon sx={{fontSize:'20px'}}/>
                    <Typography variant='span' sx={{ml:.7,...Theme.font15Regular}}>  Non-comedogenic </Typography>
                   </Box>
                    <Box sx={{ml:5}}>
                    <CheckIcon sx={{fontSize:'20px'}}/>
                    <Typography variant='span' sx={{ml:.7,...Theme.font15Regular}} > White cast free  </Typography>
                   </Box>
                    <Box sx={{ml:5}}>
                     <CheckIcon sx={{fontSize:'20px'}}/>
                    <Typography variant='span' sx={{ml:.7,...Theme.font15Regular}} >  pH: 6.0 - 7.0</Typography>
                   </Box>
                   </Box>
                <Button sx={{backgroundColor:'#000000',color:'white',mt:1,...Theme.font16Regular}}>Get ₹18 worth of MCash post-delivery.</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductDetails
