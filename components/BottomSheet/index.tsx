import { FC, useRef } from 'react';
import { View, Text } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from '../Button';

type BottomSheetProps = {
  title: string;
  description: string;
  titleToOpen?: string;
  titleToClose: string;
  titleToDelete: string;
  userFullName: string;
  handleClickToOpen: boolean;
  setIsSheetOpen: (state: boolean) => void;
};

type RBSheetRef = {
  open: () => void;
  close: () => void;
};

export const BottomSheet: FC<BottomSheetProps> = ({
  titleToOpen,
  titleToClose,
  titleToDelete,
  title,
  description,
  userFullName,
  handleClickToOpen,
  setIsSheetOpen,
}) => {
  const refRBSheet = useRef<RBSheetRef>(null);

  if (handleClickToOpen) {
    refRBSheet.current?.open();
  }

  return (
    <View className="flex-1">
      {titleToOpen && (
        <Button
          variant="default"
          onPress={() => refRBSheet.current?.open()}
          text={titleToOpen}
          textClassNames="text-[16px] text-[#01A0FF]"
        />
      )}
      <RBSheet
        onClose={() => setIsSheetOpen(false)}
        customStyles={{
          wrapper: {
            padding: 24,
          },
          container: {
            backgroundColor: 'transparent',
          },
        }}
        ref={refRBSheet}
      >
        <View className="w-full bg-white flex justify-center items-center p-[24px] rounded-[3px] mb-2">
          <View className="flex justify-center items-center mb-[45px]">
            <Text className="text-[14px]">{title}</Text>
            <Text className="text-[14px]">{userFullName}</Text>
            <Text className="text-[14px]">{description}</Text>
          </View>
          {/* TODO: Добавить логику удаления */}
          <Button
            variant="default"
            onPress={() => console.log('Удаление')}
            text={titleToDelete}
            buttonClassNames="flex justify-center items-center w-full bg-[#FF1644] rounded-[3px]"
            textClassNames="text-[16px] text-[#FFFFFF] py-[8.5px]"
          />
        </View>
        <Button
          variant="default"
          onPress={() => {
            refRBSheet.current?.close();
            setIsSheetOpen(false);
          }}
          text={titleToClose}
          buttonClassNames="flex justify-center items-center w-full bg-[#03BFA5] rounded-[3px]"
          textClassNames="text-[16px] text-[#FFFFFF] my-[8.5px]"
        />
      </RBSheet>
    </View>
  );
};
