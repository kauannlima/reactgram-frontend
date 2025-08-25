import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className="flex items-center justify-start border-t border-b border-[#363636] px-4 py-2 bg-[#1a1a1a]">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill className="text-xl text-red-500 cursor-pointer transition-transform duration-200 hover:scale-125" />
          ) : (
            <BsHeart
              className="text-xl text-gray-400 cursor-pointer transition-transform duration-200 hover:scale-125 hover:text-red-500"
              onClick={() => handleLike(photo)}
            />
          )}
          <p className="ml-3 text-gray-200 text-sm sm:text-base">{photo.likes.length} like(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
