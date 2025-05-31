import React from 'react';
import { FiEdit2, FiTrash2, FiMessageCircle, FiEye } from 'react-icons/fi';

function MyPost() {
  const posts = [
    {
      title: 'Blue Water Bottle',
      status: 'active',
      type: 'lost',
      date: '1/15/2024',
      views: 25,
      responses: 3
    },
    {
      title: 'Black Smartphone',
      status: 'claimed',
      type: 'found',
      date: '1/10/2024',
      views: 45,
      responses: 8
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'claimed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeBadgeClass = (type) => {
    return type === 'lost'
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div key={index} className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-purple-900">
                  {post.title}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(post.status)}`}>
                  {post.status}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeClass(post.type)}`}>
                  {post.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Posted: {post.date}</span>
                <span className="flex items-center gap-1">
                  <FiEye className="w-4 h-4" />
                  <span>{post.views} views</span>
                </span>
                <span className="flex items-center gap-1">
                  <FiMessageCircle className="w-4 h-4" />
                  <span>{post.responses} responses</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <FiEdit2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPost;
