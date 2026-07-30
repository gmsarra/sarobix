export default function Home() {
  const html = require('fs').readFileSync(
    require('path').join(process.cwd(), 'public/index.html'), 
    'utf8'
  );
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}