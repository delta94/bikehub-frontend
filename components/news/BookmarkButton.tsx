import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addClip, deleteClip } from '../../store/actions/user';
import ArticleScreen from '../../screens/news/ArticleScreen';
type BookMArkButtonProps = {
  tintColor: string | undefined;
  route: any;
};

export default function BookmarkButton({
  tintColor,
  route,
}: BookMArkButtonProps) {
  const dispatch = useDispatch();
  const { title, author, imgUrl, summary, url } = route.params;
  const user = useSelector((state) => state.user);
  const { clips } = user;
  const clip = {
    title: title,
    author: author,
    imgUrl: imgUrl,
    summary: summary,
    url: url,
  };

  const isClipped = () => {
    return clips.some((c: any) => c.url === url);
  };

  const button = () => {
    if (isClipped()) {
      return (
        <MaterialCommunityIcons
          name="bookmark"
          color={tintColor}
          size={26}
          style={{ marginRight: 20 }}
          onPress={() => {
            dispatch(deleteClip({ clip: clip }));
          }}
        />
      );
    } else {
      return (
        <MaterialCommunityIcons
          name="bookmark-outline"
          color={tintColor}
          size={26}
          style={{ marginRight: 20 }}
          onPress={() => {
            dispatch(addClip({ clip: clip }));
          }}
        />
      );
    }
  };

  return button();
}
