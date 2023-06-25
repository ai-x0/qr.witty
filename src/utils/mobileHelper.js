export function isMobile() {
  if (
    navigator.userAgent.match(/Mobi/i) ||
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
    // 当前设备是移动设备

    return true;
  }

  return false;
}
