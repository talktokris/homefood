import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import * as Yup from "yup";

import JobsListItem from "../components/JobsListItem";
import Screen from "../components/Screen";
import Separater from "../components/Separater";
import routes from "../navigation/routes";

import { ErrorMessage, AppForm } from "../components/forms";
import AppFormSearch from "../components/forms/AppFormSearch";

import jobs from "../api/jobs";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import settings from "../config/setting";
import NoDataMessage from "../components/forms/NoDataMessage";

const validationSchema = Yup.object().shape({
  //words: Yup.string().required().label("Search World"),
});
function JobsListScreen({ navigation }) {
  const [search, setSearch] = useState(0);

  if (search === 0) {
    var getListingsAPi = useApi(jobs.getJobListings);
  } else {
    var getListingsAPi = useApi(jobs.getJobSearchReults, { search });
  }
  useEffect(() => {
    getListingsAPi.request(search);
  }, [search]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getListingsAPi.request(search);
    });
    return unsubscribe;
  }, [navigation]);

  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = async (words) => {
    //  console.log(words.words);
    if (words.words == "") {
      setSearch(0);
    } else {
      setSearch(words.words);
    }

    /*
    const result = await jobs.getJobSearchReults(words);

    if (!result.ok) return setLoginFailed(true);
    getListingsAPi = result;
    console.log(result);
  
    setLoginFailed(false);
    //  logIn(result.data);
*/
    // console.log(user);
  };

  return (
    <>
      <ActivityIndicator visible={getListingsAPi.loading} />
      <Screen>
        <View style={styles.container}>
          <ErrorMessage
            error="Invalid email and/or password"
            visible={loginFailed}
          />
          <AppForm
            initialValues={{ words: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {/*} <AppTextSearch icon="magnify" placeholder="Search here" /> */}

            <AppFormSearch
              name="words"
              autoCapitalize="none"
              autoCorrect={false}
              icon="magnify"
              textContentType="jobTitle"
              placeholder="Search here"
            />
          </AppForm>
        </View>

        {getListingsAPi.data.length > 0 ? (
          <FlatList
            data={getListingsAPi.data}
            keyExtractor={(message) => message.id.toString()}
            renderItem={({ item }) => (
              <JobsListItem
                title={item.title}
                subTitle={item.subTitle}
                sallery={item.salleryMax}
                image={{
                  uri: settings.imageUrl + "jobs/" + item.id + "/" + item.image,
                }}
                location={item.location}
                date={item.date_expire}
                favData={item.get_fav_info}
                job_id={item.id}
                currency={item.currency}
                onPress={() => navigation.navigate(routes.JOBS_DETAILS, item)}
                renderRightActions={() => (
                  <View style={{ backgroundColor: "red", height: 70 }}></View>
                )}
              />
            )}
            ItemSeparatorComponent={Separater}
          />
        ) : (
          <NoDataMessage title="No Jobs Found" />
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({});

export default FoodListingScreen;
