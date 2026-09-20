This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
# SecureStore ইনস্টল করার জন্য
npx expo install expo-secure-store

# AsyncStorage ইনস্টল করার জন্য
npx expo install @react-native-async-storage/async-storage
```

```
import * as SecureStore from 'expo-secure-store'; // ফাইলের শুরুতে একবারই ইম্পোর্ট হবে

// ১. সেট করা
const saveToken = async (token) => {
  await SecureStore.setItemAsync('auth_token', token);
};

// ২. গেট করা (আলাদা করে ইম্পোর্ট লাগবে না)
const getToken = async () => {
  return await SecureStore.getItemAsync('auth_token');
};

// ৩. ডিলিট করা (আলাদা করে ইম্পোর্ট লাগবে না)
const removeToken = async () => {
  await SecureStore.deleteItemAsync('auth_token');
};


```

```
// অবজেক্ট সেভ করার সময় (Object -> String)
const userObject = { id: 1, name: "Noyun", email: "noyun@example.com" };
await SecureStore.setItemAsync('user_info', JSON.stringify(userObject));

// অবজেক্ট পড়ার সময় (String -> Object)
const savedData = await SecureStore.getItemAsync('user_info');
if (savedData) {
  const user = JSON.parse(savedData);
  console.log(user.name); // Noyun
}

```


```
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleAsyncStorageOps = async () => {
  try {
    // ১. ডেটা সেট / সেভ করা (Set)
    await AsyncStorage.setItem('user_theme', 'light');
    console.log('১. থিম সেভ হয়েছে: light');

    // ২. ডেটা পড়া / রিড করা (Get)
    let currentTheme = await AsyncStorage.getItem('user_theme');
    console.log('২. বর্তমান থিম:', currentTheme); // Output: light

    // ৩. ডেটা আপডেট করা (Update - সেম Key দিয়ে আবার setItem করলে আগেরটা রিপ্লেস হয়ে আপডেট হয়)
    await AsyncStorage.setItem('user_theme', 'dark');
    currentTheme = await AsyncStorage.getItem('user_theme');
    console.log('৩. থিম আপডেট করা হয়েছে:', currentTheme); // Output: dark

    // ৪. ডেটা মুছে ফেলা (Delete)
    await AsyncStorage.removeItem('user_theme');
    console.log('৪. থিম ডিলিট হয়ে গেছে।');

  } catch (error) {
    console.error('AsyncStorage প্রবলেম:', error);
  }
};

```


```
npx expo install @tanstack/react-query 


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* আপনার মূল অ্যাপের নেভিগেশন বা কম্পোনেন্ট */}
    </QueryClientProvider>
  );
}


import { useQuery } from '@tanstack/react-query';
import { Text, View, ActivityIndicator, FlatList } from 'react-native';

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
};

export default function PostsScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 16, marginBottom: 10 }}>{item.title}</Text>
        )}
      />
    </View>
  );
}


import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { focusManager } from '@tanstack/react-query';

export function useAppStateFocus() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
      if (Platform.OS !== 'web') {
        // অ্যাপ যদি অ্যাক্টিভ মোডে আসে, তবে FocusManager-কে ট্রু পাঠাবে
        focusManager.setFocused(status === 'active');
      }
    });

    return () => subscription.remove();
  }, []);
}



npx expo install @react-native-community/netinfo

import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

export function useOnlineManager() {
  useEffect(() => {
    // NetInfo লিড করে নেটওয়ার্ক স্ট্যাটাস আপডেট রাখা
    return NetInfo.addEventListener((state) => {
      onlineManager.setOnline(
        Boolean(state.isConnected && state.isInternetReachable)
      );
    });
  }, []);
}


```


```

npx expo install expo-notifications

import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    async function setupNotificationCategories() {
      // 'reply-category' নামে একটি ক্যাটাগরি বানানো হচ্ছে যেখানে Input ফিল্ড থাকবে
      await Notifications.setNotificationCategoryAsync('reply-category', [
        {
          identifier: 'reply_action', // বাটন আইডি
          buttonTitle: 'Reply', // বাটনের লেখা
          textInput: {
            submitButtonTitle: 'Send', // সেন্ড বাটনের ক্যাপশন
            placeholder: 'Type a message...', // ইনপুট বক্সের প্লেসহোল্ডার
          },
          options: {
            opensAppToForeground: false, // ইউজার নোটিফিকেশনে রিপ্লাই দিলে অ্যাপ ওপেন হবে না, ব্যাকগ্রাউন্ডেই কাজ করবে
          },
        },
      ]);
    }

    setupNotificationCategories();
  }, []);
}


useEffect(() => {
  const subscription = Notifications.addNotificationResponseReceivedListener(response => {
    const actionIdentifier = response.actionIdentifier;

    // ইউজার যদি আমাদের ওই ইনপুট একশনে ক্লিক করে থাকে
    if (actionIdentifier === 'reply_action') {
      // ইউজার ইনপুট বক্সে যা লিখেছে তা পাওয়ার উপায়:
      const userMessage = response.userText; 
      
      console.log('ইউজারের রিপ্লাই করা মেসেজ:', userMessage);

      // এখানে আপনি সরাসরি আপনার ব্যাকএন্ড এপিআই রিকোয়েস্ট মারতে পারবেন
      // sendReplyToBackend(userMessage);
    }
  });

  return () => subscription.remove();
}, []);

```




