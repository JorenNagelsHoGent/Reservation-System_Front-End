function SocialLink(props) {
  const link = `https://${props.platform}.com/vcoudegem`;
  const iconLink = `fab fa-${props.platform}`;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <i className={iconLink}></i>
    </a>
  );
}

export default SocialLink;
