import {  GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  // useStateを使って状態を定義する
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);

  // マウント時に画像を読み込む宣言
  // useEffect(()=>{
  //   fetchImage().then((newImage) => {
  //     // 画像URLの状態を更新する
  //     setImageUrl(newImage.url);
  //     // ローディング状態を更新する
  //     setLoading(false);
  //   });
  // },[]);

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
      <div className="styles.page">
        <button onClick={handleClick} className={styles.button}>他のにゃんこも見る</button>
        <div className={styles.frame}>
          {loading || <img src={imageUrl} className={styles.im} />}
          </div>;
      </div>
    </>
  )
};

export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> =async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    }
  }
};

type Image = {
  url: string;
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();

  return images[0];
};

fetchImage();