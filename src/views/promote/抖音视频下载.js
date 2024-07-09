import axios from 'axios';
import { JSDOM } from 'jsdom';
// 获取网页内容
async function fetchHTML(url) {
  const response = await axios.get(url);
  return response.data;
}
// 解析DOM并获取视频信息
async function getVideosInfo(html) {
  const { window } = new JSDOM(html);
  const { document } = window;
  // 查找所有视频首屏图片
  const videoElements = document.querySelectorAll('.video-card .video-thumb');
  const videosInfo = [];
  // 遍历视频元素
  videoElements.forEach(videoElement => {
    const likeCount = Number(videoElement.querySelector('.like-count').textContent);
    const videoTime = Number(videoElement.querySelector('.video-time').textContent);
    const videoTitle = videoElement.querySelector('.video-title').textContent;
    const videoAuthor = videoElement.querySelector('.video-author').textContent;
    const videoImageUrl = videoElement.querySelector('img').getAttribute('src');
    // 下载图片并转为base64
    // 如果点赞数超过5000，则保存视频信息
    if (likeCount > 5000) {
      videosInfo.push({
        like: likeCount,
        videoTime,
        videoTitle,
        videoAuthor,
        videoImage: videoImageUrl
      });
    }
  });
  return videosInfo;
}
// 向后端上传视频信息
async function uploadVideosInfo(videosInfo) {
  try {
    const response = await axios.post('/api/video/info', videosInfo);
    console.log('111111111', response.data);
  } catch (error) {
    console.error('2222222222', error);
  }
}
// 主函数
async function main() {
  const html = await fetchHTML('https://www.douyin.com/discover');
  const videosInfo = await getVideosInfo(html);
  await uploadVideosInfo(videosInfo);
}
// 执行主函数
main();
