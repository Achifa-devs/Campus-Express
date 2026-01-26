package com.ucommerce.campussphere

import android.os.Bundle
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "app"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onLowMemory() {
        super.onLowMemory()
        System.gc()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        // 🔧 Fix for react-native-screens crash when restoring fragments
        try {
            savedInstanceState?.clear() // Prevents restoring old fragments
        } catch (e: Exception) {
            e.printStackTrace()
        }

        super.onCreate(savedInstanceState)

        // ✅ Status bar customization
        WindowCompat.setDecorFitsSystemWindows(window, false)

        // ✅ Optional: Limit memory-heavy background restoration
        // Prevents app restart after returning from camera
        intent?.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP)
    }


}