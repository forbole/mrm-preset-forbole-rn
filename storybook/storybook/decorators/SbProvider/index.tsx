import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack/src/types';
import {LegalProvider} from '../../../src/contexts/LegalContext';
import {TransportBLEProvider} from '../../../src/contexts/TransportBLEContext';
import {WalletCreationProvider} from '../../../src/contexts/WalletCreationContext';
import {createBackButtonTitleHeader} from '../../../src/navigation/helpers';
import InAppWebView from '../../../src/screens/InAppWebView';

const Stack = createNativeStackNavigator();

/**
 * A decorator that wraps the child stories inside Providers, such as NavigationContainer
 * for react-navigation.
 *
 * Currently using screenOptions: any until a better alternative is found.
 */
const SbProvider = ({
  screenComponent,
  screenOptions,
  initialParams,
}: {
  screenComponent: any;
  screenOptions:
    | NativeStackNavigationOptions
    | ((props: any) => NativeStackNavigationOptions);
  initialParams?: {[index: string]: any};
}) => {
  return (
    <WalletCreationProvider>
      <TransportBLEProvider>
        <LegalProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                initialParams={initialParams}
                options={screenOptions}
                name="storybook"
                component={screenComponent}
              />
              <Stack.Screen
                options={({route}) => {
                  return createBackButtonTitleHeader({
                    // @ts-ignore
                    titleI18n: route?.params?.title,
                  }).options;
                }}
                name="InAppWebView"
                component={InAppWebView}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </LegalProvider>
      </TransportBLEProvider>
    </WalletCreationProvider>
  );
};

export default SbProvider;
