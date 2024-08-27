import React from 'react';
import useQueryWishlist from '../Hooks/useQueryWishlist';
import { removeFromWishlist, getWishlist } from '../Apis/WishlistApi';
import Loading from './Loading';
import useMutationWishlist from '../Hooks/useMutationWishlist';

export default function Wishlist() {
  let { mutate: removeItem} = useMutationWishlist(removeFromWishlist);
  let { isError, error, data, isLoading } = useQueryWishlist('getwishlist', getWishlist);

  if (isLoading) return <Loading></Loading>;

  if (isError) {
    console.error('Error fetching wishlist:', error);
    return <h2>{error.message}</h2>;
  }

  console.log('Wishlist data:', data);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((ele) => (
            <tr key={ele?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={ele?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.title}
              </td>
              <td className="px-6 py-4">
                <a onClick={() => {
                  console.log('Remove item', ele?._id);
                  removeItem(ele?._id);
                }} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}