import {useEffect, useState} from 'react';

import {setLangData, setLocale, useLocaleStore} from '../store/reducers/locale';

import {useDispatch, useSelector} from 'react-redux';



// getLocales
export const useLocalizationsRecourses = () => {
  const {langID, rtl, locale, localizations, langTitle} = useLocaleStore();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [lastLanguageId, setLastLanguageId] = useState(-1);
  const [error, setError] = useState('');

  interface LangType {
    ShortName: string;
    resources: any;
    isRTL: boolean;
    LanguageId: number;
    Localizations: any;
    Name: string;
    strings: any;
  }

  useEffect(() => {
    // if (langID === lastLanguageId) {
    //   return;
    // }

    // if (loading) return;
    // setLastLanguageId(langID);
    // api
    //   .get<any>(`${endPoints.RESOURCES}`, {
    //     headers: {
    //       LangId: langID,
    //     },
    //   })
    //   .then(([response, error]) => {
    //     // setIsLocaleLoaded(true);
    //     console.log('locale data', JSON.stringify(response, null, 2));
    //     if (error) {
    //       // notify.error(error.responseMessage);
    //       return;
    //     }
    //     if (response?.Success) {
    //       // setLastLanguageId(langID);
    //       const data = response;

    //       dispatch(
    //         setLangData({
    //           // strings: locale == 'AR' ? arData : enData,
    //           strings: data.Data.ResourceDictionary,
    //           langID: langID,
    //           locale: locale,
    //           localizations: [],
    //           langTitle: langTitle,
    //           rtl: rtl,
    //         }),
    //       );
    //     }
    //   });
  }, [langID, loading]);

  // return {
  //   loading,
  //   error,
  // };
};

// get language
export type Language = {
  languageID: number;
  languageCode: string;
  languageShortName: string;
  isRTL: boolean;
  languageName: string;
};

export const getLanguages = async () => {
  //   const [res, error] = await api.get(endPoints.LANGUAGES);
  //   if (error) {
  //     Alert.alert('Error', 'Error while fetching languages');
  //     return [];
  //   }
  //   return (res?.data?.data || []) as Language[];
};
