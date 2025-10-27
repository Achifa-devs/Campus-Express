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

    override fun onCreate(savedInstanceState: Bundle?) {
        // ❗ Prevent Android from restoring fragments automatically
        super.onCreate(null)
        
        // Optional UI setup
        WindowCompat.setDecorFitsSystemWindows(window, false)

        // If you want to customize status bar appearance, you can add:
        // val controller = WindowInsetsControllerCompat(window, window.decorView)
        // controller.isAppearanceLightStatusBars = true
    }
}
