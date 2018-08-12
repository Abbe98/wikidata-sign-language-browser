export function isVideo(url) {
  // ref https://github.com/yarl/pattypan/blob/master/src/pattypan/Util.java#L133
  const videoSuffixes = ['ogg', 'ogv', 'webm'];
  return videoSuffixes.some(suffix => url.endsWith(suffix));
}
