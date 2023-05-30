import { View, Text, Alert, Pressable, ScrollView } from "react-native";
import Ball from "../../components/Ball";
import { Result } from "../../components/enums";
import { deletedSave } from "../../redux/slices/currentGame";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { XIcon } from "../../utils/svg";
import BallController from "../../components/BallController";

const RowItem = (props: { item: Result; currIndex: number }) => {
  const { item, currIndex } = props;

  const { previousResults, specialNumberMax } = useAppSelector(
    (state) => state.currentGame.currentGame
  );

  return (
    <View
      style={{
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1F5062",
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 12,
        marginHorizontal: 6,
        paddingVertical: 12,
        marginTop: 6,
      }}
    >
      <ScrollView horizontal>
        <View
          style={{
            paddingBottom: 10,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Winning Combination
          </Text>

          {item?.date && (
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {item?.date}
            </Text>
          )}

          {item?.price && (
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {item?.price}
            </Text>
          )}
        </View>
      </ScrollView>
      <View
        key={123}
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {item.numbers.map((num, index) => (
          <BallController
            notAdd={false}
            key={`${num}${index}`}
            {...{
              currentIndex: currIndex,
              number: num,
              prevResults: previousResults,
            }}
            render={(hex, clicked, onClick) => (
              <Ball key={index} title={num} hex={hex} />
            )}
          />
        ))}

        {item.numbersEuro?.map((num, index) => (
          <BallController
            notAdd={false}
            key={`${num}${index}`}
            {...{
              currentIndex: currIndex,
              number: num,
              prevResults: previousResults,
            }}
            render={(hex, clicked, onClick, _, hexEuro) => (
              <Ball key={index} title={num} hex={hex} />
            )}
          />
        ))}

        {specialNumberMax !== 0 && (
          <BallController
            notAdd={false}
            key={item.id}
            {...{
              currentIndex: currIndex,
              number: item.specialNumber,
              prevResults: previousResults,
            }}
            render={(hex, clicked, onClick, activeSet) => (
              <Ball title={item.specialNumber || 0} hex="#fff" />
            )}
          />
        )}
      </View>
    </View>
  );
};

const TestScreen = () => {
  const dispath = useAppDispatch();
  const saved = useAppSelector((state) => state.currentGame.currentGame.saved);
  const prevResults = useAppSelector(
    (state) => state.currentGame.currentGame.previousResults
  );

  const lastest = prevResults[0];

  console.log("saved", saved);
  const handleDeleteSaved = (index: number) => {
    dispath(deletedSave(index));
  };

  return (
    <View
      style={{
        flex: 0.9,
      }}
    >
      {lastest && <RowItem item={lastest} currIndex={0} />}
      <ScrollView style={{}}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
            paddingVertical: 6,
          }}
        >
          {saved?.map((obj, index) => (
            <View
              key={index}
              style={{
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1F5062",
                borderRadius: 4,
                paddingHorizontal: 12,
                marginHorizontal: 6,
                paddingVertical: 12,
                gap: 6,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {obj.numbers.map((num, idx) => (
                    <Ball key={idx} title={num.number} hex={num.hex} />
                  ))}

                  {obj.numbersEuro?.map((num, idx) => (
                    <Ball key={idx} title={num.number} hex={num.hex} />
                  ))}

                  {obj?.specialNumber !== 0 && (
                    <Ball
                      onClick={() => {}}
                      title={obj.specialNumber || 0}
                      hex="#fff"
                    />
                  )}
                </View>

                <Pressable
                  android_ripple={{ color: "#1F5062" }}
                  style={{
                    borderRadius: 4,
                  }}
                  onPress={() =>
                    Alert.alert("Alert", "Delete Saved?", [
                      {
                        text: "Delete",
                        onPress: () => {
                          handleDeleteSaved(index);
                        },
                      },
                      {
                        text: "Cancel",
                        onPress: () => {},
                      },
                    ])
                  }
                >
                  <XIcon />
                </Pressable>
              </View>
              {obj?.date && (
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {new Intl.DateTimeFormat("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(obj?.date))}
                  {/* {obj?.date} */}
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TestScreen;
