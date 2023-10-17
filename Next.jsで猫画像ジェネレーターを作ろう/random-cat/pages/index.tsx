import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
  // useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  // マウント時に画像を読み込む宣言
  useEffect(()=>{
    fetchImage().then((newImage) => {
      // 画像URLの状態を更新する
      setImageUrl(newImage.url);
      // ローディング状態を更新する
      setLoading(false);
    });
  },[]);

  // ボタンをクリックしたときに画像を読み込む処理
  const handleClick =async () => {
    // 読み込み中フラグを立てる
    setLoading(true);
    const newImage = await fetchImage();
    // 画像URLの状態を更新する
    setImageUrl(newImage.url);
    // 読み込み中フラグを倒す
    setLoading(false);
  };

  // ローディング中でなければ画像を表示する
  return(
    <>
      <button onClick={handleClick}>他のにゃんこも見る</button>
      <div>{loading || <img src={imageUrl} />}</div>;
    </>
  )
};

export default IndexPage;

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();

  return images[0];
};

fetchImage();