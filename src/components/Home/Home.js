import './Home.scss'

export const Home = () => {
  let titleText = 'Hello,'
  let bodyText =
    "I'm Cody Markham and I’m a full stack software engineer, outdoor enthusiast, and photographer. I currently live in Colorado and, like most folks here, " +
    "I collect all the hobbies when I'm not working on code and sipping mochas. You can find me hiking in the summer and skiing in the winter, usually with a " +
    'camera in hand. This website is a place where I can showcase my skills and play with different front end techniques and ideas. Anyway, that’s enough of an ' +
    'intro for a home page, check out my About page for a digitized version of my resume, check out my Photography page if you came here to see some of my art, ' +
    'and hit me up via my contact page just to see if I got my email linkages correct! '

  const getUserMedia = async () => {
    const accessToken = process.env.REACT_APP_INSTAGRAM_KEY;
    const fields = `id,caption,media_url,timestamp,media_type,permalink`;
    const userId = '7436680339745871';
    const url = `https://graph.instagram.com/v19.0/${userId}/media?fields=${fields}&access_token=${accessToken}`;
    const data = await fetch(url);
    const feed = await data.json();

    console.log(feed)
  }

  getUserMedia()

  return (
    <div className="container">
      <div className="home-page">
        <div className="content-zone left-zone">
          <h1>{titleText}</h1>
          <h3>{bodyText}</h3>
          <h3>See you on the trail!</h3>
          <h3>—Cody</h3>
        </div>
        <div className="content-zone right-zone">
          <h3>TODO embed a feed of instagram content here</h3>
        </div>
      </div>
    </div>
  )
}
