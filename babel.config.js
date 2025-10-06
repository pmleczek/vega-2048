/*
 * Copyright (c) 2022 Amazon.com, Inc. or its affiliates.  All rights reserved.
 *
 * PROPRIETARY/CONFIDENTIAL.  USE IS SUBJECT TO LICENSE TERMS.
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@atoms': './src/atoms',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@utils': './src/utils',
        },
      },
    ],
    '@amazon-devices/react-native-reanimated/plugin',
  ],
};
