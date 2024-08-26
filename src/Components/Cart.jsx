import React from 'react';
import useQuerycart from '../Hooks/useQuerycart';
import { deleteCart, getCart, updateCart } from '../Apis/CartApi';
import Loading from './Loading';
import useMutationcart from '../Hooks/useMutationcart';
import BasicModal from './BasicModal';

export default function Cart() {
  let { mutate: deletem, status: x } = useMutationcart(deleteCart);
  let { mutate: updatem, status: y } = useMutationcart(updateCart);

  let { isError, error, data, isLoading } = useQuerycart('getcart', getCart);

  if (isLoading) return <Loading></Loading>;

  if (isError) return <h2>{error.message}</h2>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <p className='text-black'>TotalPrice:<span className='text-green-400'>{data?.data.totalCartPrice} $</span></p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.products.map((ele) => (
            <tr key={ele?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={ele?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.product?.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button onClick={() => {
                    updatem({ id: ele?.product?._id, count: ele?.count - 1 });
                  }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <span>{ele?.count}</span>
                  </div>
                  <button onClick={() => {
                    updatem({ id: ele?.product?._id, count: ele?.count + 1 });
                  }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.price}
              </td>
              <td className="px-6 py-4">
                <a onClick={() => {
                  console.log('Delete item', ele?.product?._id);
                  deletem(ele?.product?._id);
                }} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BasicModal cartId={data?.data?._id}></BasicModal>
    </div>
  );
}