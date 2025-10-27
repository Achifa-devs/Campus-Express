# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# React Native core
-keep class com.facebook.react.** { *; }
-keepclassmembers class * extends com.facebook.react.bridge.ReactContextBaseJavaModule { *; }
-keepclassmembers class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keepclassmembers class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers class * extends com.facebook.react.uimanager.ViewManager { *; }

# React Native Screens & Navigation
-keep class com.swmansion.** { *; }
-keep class androidx.fragment.app.Fragment { *; }

# React Native Image Picker
-keep class com.imagepicker.** { *; }
-keep class com.reactnative.ivpusic.imagepicker.** { *; }

# Firebase (FCM, Auth, etc.)
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.messaging.**
-dontwarn com.google.firebase.iid.**

# OkHttp (network layer)
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

# FileProvider
-keep public class androidx.core.content.FileProvider { *; }

# Prevent removal of Parcelables
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}

# Keep all models with annotations (e.g., JSON serialization)
-keep class * {
    @com.google.gson.annotations.SerializedName <fields>;
}
