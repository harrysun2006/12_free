package com.free.util;

import java.security.MessageDigest;
import java.sql.Blob;
import java.util.Random;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class CryptUtil {

  public static final int AES_128_KEYBITS = 16;
  public static final int AES_192_KEYBITS = 24;
  public static final int AES_256_KEYBITS = 32;

  public static final int DEFAULT_SALT_LEN = 6;

  public static byte[] AESDecrypt(byte[] text, String key) {
    return AESDecrypt(text, key, AES_128_KEYBITS);
  }

  public static byte[] AESDecrypt(byte[] text, String key, int bits) {
    if (text == null)
      return null;
    byte[] b = null;
    try {
      byte[] raw = key.getBytes("ASCII");
      byte[] rawKey = new byte[bits];
      for (int i = 0; i < raw.length; i++)
        rawKey[i] = raw[i];
      SecretKeySpec skeySpec = new SecretKeySpec(rawKey, 0, bits, "AES");
      Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
      cipher.init(Cipher.DECRYPT_MODE, skeySpec);
      b = cipher.doFinal(text);
    } catch (Exception e) {
      // e.printStackTrace();
    }
    return b;
  }

  public static String AESDecrypt(Blob blob, String key, String charSet) {
    return AESDecrypt(blob, key, AES_128_KEYBITS, charSet);
  }

  public static String AESDecrypt(Blob blob, String key, int bits, String charSet) {
    String r = null;
    try {
      r = AESDecrypt(blob.getBytes((long) 1, (int) blob.length()), key, bits, charSet);
    } catch (Exception e) {
      // e.printStackTrace();
    }
    return r;
  }

  public static String AESDecrypt(byte[] text, String key, String charSet) {
    return AESDecrypt(text, key, AES_128_KEYBITS, charSet);
  }

  public static String AESDecrypt(byte[] text, String key, int bits, String charSet) {
    String r = null;
    try {
      if (text != null) {
        byte[] b = AESDecrypt(text, key, bits);
        if (b != null)
          r = new String(b, charSet);
      }
    } catch (Exception e) {
      // e.printStackTrace();
    }
    return r;
  }

  public static byte[] AESEncrypt(String text, String key) {
    return AESEncrypt(text, key, AES_128_KEYBITS);
  }

  public static byte[] AESEncrypt(String text, String key, int bits) {
    return AESEncrypt(text, key, "", bits);
  }

  public static byte[] AESEncrypt(String text, String key, String charSet) {
    return AESEncrypt(text, key, charSet, AES_128_KEYBITS);
  }

  public static byte[] AESEncrypt(String text, String key, String charSet, int bits) {
    if (text == null)
      return null;
    byte[] b = null;
    try {
      byte[] raw = key.getBytes("ASCII");
      byte[] rawKey = new byte[bits];
      for (int i = 0; i < raw.length; i++)
        rawKey[i] = raw[i];
      SecretKeySpec skeySpec = new SecretKeySpec(rawKey, "AES");
      Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
      cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
      if (charSet != null && charSet.trim().length() > 0) {
        b = cipher.doFinal(text.getBytes(charSet));
      } else {
        b = cipher.doFinal(text.getBytes());
      }
    } catch (Exception e) {
      // e.printStackTrace();
    }
    return b;
  }

  public static byte[] md5(byte[] data) throws Exception {
    MessageDigest md5 = MessageDigest.getInstance("MD5");
    return md5.digest(data);
  }

  public static String genSalt() {
    return genSalt(DEFAULT_SALT_LEN);
  }

  public static String genSalt(int len) {
    Random r = new Random();
    StringBuilder salt = new StringBuilder();
    int c;
    for (int i = 0; i < len; i++) {
      c = 33 + r.nextInt(94); // ! ... ~ [33, 126]
      salt.append((char) c);
    }
    return salt.toString();
  }

  /**
   * BKDRHash, APHash, DJBHash, JSHash, RSHash, SDBMHash, PJWHash,
   * ELFHash字符串Hash函数比较： http://www.demix.cn/h?z=28676 java使用的就是BKDRHash, seed =
   * 31
   * 
   * @param str
   * @return
   */
  public static long BKDRHash(String str) {
    long seed = 131; // 31 131 1313 13131 131313 etc..
    long hash = 0;
    for (int i = 0; i < str.length(); i++) {
      hash = (hash * seed) + str.charAt(i);
    }
    return hash;
  }

  public static long APHash(String str) {
    long hash = 0xAAAAAAAA; // 0x0;
    for (int i = 0; i < str.length(); i++) {
      if ((i & 1) == 0) {
        hash ^= ((hash << 7) ^ str.charAt(i) ^ (hash >> 3));
      } else {
        hash ^= (~((hash << 11) ^ str.charAt(i) ^ (hash >> 5)));
      }
    }
    return hash; // hash & 0x7FFFFFFF;
  }

  public static long DJBHash(String str) {
    long hash = 5381;
    for (int i = 0; i < str.length(); i++) {
      hash = ((hash << 5) + hash) + str.charAt(i);
    }
    return hash;
  }

  public static long JSHash(String str) {
    long hash = 1315423911;
    for (int i = 0; i < str.length(); i++) {
      hash ^= ((hash << 5) + str.charAt(i) + (hash >> 2));
    }
    return hash; // hash & 0x7FFFFFFF;
  }

  public static long RSHash(String str) {
    int a = 63689;
    int b = 378551;
    long hash = 0;
    for (int i = 0; i < str.length(); i++) {
      hash = hash * a + str.charAt(i);
      a = a * b;
    }
    return hash;
  }

  public static long SDBMHash(String str) {
    long hash = 0;
    for (int i = 0; i < str.length(); i++) {
      hash = str.charAt(i) + (hash << 6) + (hash << 16) - hash;
    }
    return hash;
  }

  public static long PJWHash(String str) {
    long BitsInUnsignedInt = (long) (4 * 8);
    long ThreeQuarters = (long) ((BitsInUnsignedInt * 3) / 4);
    long OneEighth = (long) (BitsInUnsignedInt / 8);
    long HighBits = (long) (0xFFFFFFFF) << (BitsInUnsignedInt - OneEighth);
    long hash = 0;
    long test = 0;
    for (int i = 0; i < str.length(); i++) {
      hash = (hash << OneEighth) + str.charAt(i);
      if ((test = hash & HighBits) != 0) {
        hash = ((hash ^ (test >> ThreeQuarters)) & (~HighBits));
      }
    }
    return hash;
  }

  public static long ELFHash(String str) {
    long hash = 0;
    long x = 0;
    for (int i = 0; i < str.length(); i++) {
      hash = (hash << 4) + str.charAt(i);
      if ((x = hash & 0xF0000000L) != 0) {
        hash ^= (x >> 24);
      }
      hash &= ~x;
    }
    return hash;
  }

  public static long DEKHash(String str) {
    long hash = str.length();
    for (int i = 0; i < str.length(); i++) {
      hash = ((hash << 5) ^ (hash >> 27)) ^ str.charAt(i);
    }
    return hash;
  }

  public static long BPHash(String str) {
    long hash = 0;
    for (int i = 0; i < str.length(); i++) {
      hash = hash << 7 ^ str.charAt(i);
    }
    return hash;
  }

  public static long FNVHash(String str) {
    long fnv_prime = 0x811C9DC5;
    long hash = 0;
    for (int i = 0; i < str.length(); i++) {
      hash *= fnv_prime;
      hash ^= str.charAt(i);
    }
    return hash;
  }

}
