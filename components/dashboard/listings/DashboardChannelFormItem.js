import Image from "next/image";
import React from "react";

const DashboardChannelFormItem = ({ channel, item, handleSetChannel }) => {
  const imageUrl = item?.thumbnails?.medium?.url;
  const imageHeight = item?.thumbnails?.medium?.height;
  const imageWidth = item?.thumbnails?.medium?.width;
  return (
    <div className="col-12">
      <div
        className={`card flex-md-row mb-4 box-shadow h-md-250 ${
          item.channelId == channel.channelId && "text-white bg-success"
        }`}
      >
        <div className="card-body d-flex flex-column align-items-start">
          <strong className="d-inline-block mb-2 text-success">Design</strong>
          <h3 className="mb-0">{item?.name}</h3>
          <div className="mb-1 text-muted">{item?.publishedAt}</div>
          <p className="card-text mb-auto">{item?.description}</p>
          <div>Views {item?.viewCount}</div>
          <div>SubscriberCount: {item?.subscriberCount}</div>
          <div>Total Video: {item?.videoCount}</div>
          <div>channel Id: {item?.channelId}</div>
          <div className="card-text mb-auto">
            View:{" "}
            <a
              href={`https://www.youtube.com/channel/${item?.channelId}`}
              target="_blank"
              rel="noreferrer"
            >
              View Channel
            </a>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={(e) => handleSetChannel(e, item)}
          >
            {item.channelId == channel.channelId
              ? "Selected"
              : "This the right channel"}
          </button>
        </div>
        <Image
          className="card-img-right flex-auto d-none d-md-block"
          data-src="holder.js/200x250?theme=thumb"
          alt="Thumbnail [200x250]"
          width={imageWidth}
          height={imageHeight}
          src={imageUrl}
        />
      </div>
    </div>
  );
};

export default DashboardChannelFormItem;
