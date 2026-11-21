import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

window.nativeSaveFile = async (blob, filename, mimeType) => {
  try {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    const base64 = btoa(binary);
    const saved = await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Cache,
      recursive: true
    });
    await Share.share({
      title: filename,
      text: `فایل ساخته‌شده توسط GeoField: ${filename}`,
      url: saved.uri,
      dialogTitle: 'ذخیره یا ارسال فایل'
    });
  } catch (error) {
    alert('ذخیره یا اشتراک‌گذاری فایل انجام نشد: ' + (error?.message || error));
  }
};
