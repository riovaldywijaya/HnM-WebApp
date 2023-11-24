/* eslint-disable no-unused-vars */
import { FETCH_CATEGORIES, FETCH_CATEGORY, FETCH_PRODUCT, FETCH_PRODUCTS } from './actionType';
import Swal from 'sweetalert2';

export const fetchProductsAction = (payload) => {
  return {
    type: FETCH_PRODUCTS,
    payload,
  };
};

export const fetchProductAction = (payload) => {
  return {
    type: FETCH_PRODUCT,
    payload,
  };
};

export const fetchCategoriesAction = (payload) => {
  return {
    type: FETCH_CATEGORIES,
    payload,
  };
};

export const fetchCategoryAction = (payload) => {
  return {
    type: FETCH_CATEGORY,
    payload,
  };
};

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const baseUrl = 'http://localhost:3000';
// const baseUrl = 'https://p3-gc1-server.riovaldywijaya.xyz';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/products`, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw new Error('Something wrong!');
      const data = await response.json();
      const action = fetchProductsAction(data);
      dispatch(action);
      return action;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchDetailProduct = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/products/${id}`, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw new Error('Something wrong!');
      const data = await response.json();
      const action = fetchProductAction(data);
      dispatch(action);

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw new Error('Something wrong!');
      const data = await response.json();
      const action = fetchCategoriesAction(data);
      dispatch(action);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const fetchDetailCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/categories/${id}`, {
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw new Error('Something wrong!');
      const data = await response.json();
      const action = fetchCategoryAction(data);
      dispatch(action);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const handleLogin = (formData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw data.message;

      localStorage.setItem('access_token', data.access_token);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const createProduct = (formData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(formData),
      });
      console.log(response, '<<<<<<<< ini response');
      if (!response.ok) throw new Error('Something wrong!');

      dispatch(fetchProducts());
      Toast.fire({
        icon: 'success',
        title: 'Create product successfully',
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateProduct = ({ formData, id }) => {
  return async (dispatch) => {
    try {
      // console.log(formData);
      const response = await fetch(`${baseUrl}/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Something wrong!');

      dispatch(fetchProducts());
      Toast.fire({
        icon: 'success',
        title: 'Update product successfully',
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const handleDeleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw new Error('Something wrong!');

      dispatch(fetchProducts());
      Toast.fire({
        icon: 'success',
        title: 'Delete product successfully',
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const createCategory = (formData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Something wrong!');

      dispatch(fetchCategories());
      Toast.fire({
        icon: 'success',
        title: 'Create category successfully',
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const updateCategory = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/categories/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(data.formData),
      });
      if (!response.ok) throw new Error('Something wrong!');

      dispatch(fetchCategories());
      Toast.fire({
        icon: 'success',
        title: 'Update category successfully',
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const handleDeleteCategory = (categoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token,
        },
      });
      if (!response.ok) throw new Error('Something wrong!');

      dispatch(fetchCategories());
      Toast.fire({
        icon: 'success',
        title: 'Delete category successfully',
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const createAdmin = (formData) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access_token: localStorage.access_token,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Something wrong!');

      Toast.fire({
        icon: 'success',
        title: 'Create admin successfully',
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

// export const fetchProducts = () => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch('http://localhost:3000/products?_embed=images&_expand=category&_expand=user');
//       if (!response.ok) throw new Error('Something wrong!');
//       const data = await response.json();
//       const action = fetchProductsAction(data);
//       dispatch(action);
//       return action;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };
// };

// export const createProduct = (formData) => {
//   return async (dispatch) => {
//     try {
//       const formDataProducts = {
//         name: formData.name,
//         slug: 'ini tes',
//         description: formData.description,
//         price: formData.price * 1,
//         mainImg: formData.mainImg,
//         categoryId: formData.categoryId * 1,
//         userId: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       //   console.log(formDataProducts, '<<<<<<< ini form products');

//       const responseProduct = await fetch(`${baseUrl}/products`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formDataProducts),
//       });
//       if (!responseProduct.ok) throw new Error('Something wrong!');

//       const dataProduct = await responseProduct.json();

//       const formDataImages = {
//         productId: dataProduct.id,
//         imgUrl: [formData.imgUrl1, formData.imgUrl2, formData.imgUrl3, formData.imgUrl4, formData.imgUrl5],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };

//       //   console.log(formDataImages, '<<<<<<< ini form images');

//       const responseImages = await fetch(`${baseUrl}/images`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formDataImages),
//       });

//       if (!responseImages.ok) throw new Error('Something wrong!');

//       dispatch(fetchProducts());
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };
// };
