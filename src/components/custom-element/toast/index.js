import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import ReactToastr, { ToastContainer, ToastMessageFactory } from "react-toastr"
import Router from "next/router"
// import { Actions } from '@popskids-core';

class CustomElementToastIndex extends Component {
  constructor(props) {
    super(props)
    this.handleShowMessage = this.handleShowMessage.bind(this)
  }

  // componentDidMount() {
  // 	this.handlePropsErrorChange(this.props.hasErrored);
  // }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.hasErrored) {
      this.handlePropsErrorChange(nextProps.hasErrored)
    }

    if (nextProps.hasErroredServer) {
      this.handlePropsErrorChange(nextProps.hasErroredServer)
    }

    if (nextProps.hasMessages) {
      this.handlePropsMessageChange(nextProps.hasMessages)
    }
  }

  handlePropsErrorChange(err) {
    if (!_.isUndefined(err) && !_.isEmpty(err) && 400 <= err.statusCode < 500) {
      var errCondition = !_.isUndefined(err.message) ? err.message : err.name
      var messages = this.handleParseErrorMessages(errCondition)

      this.refs.container.error(messages, "Đã có lỗi xảy ra", {
        timeOut: 3000,
        extendedTimeOut: 10000,
      })
    }
    this.props.dispatch(Actions.resetMessages())
  }

  handlePropsMessageChange(dataMessage) {
    if (
      dataMessage.response == "success" ||
      (!_.isUndefined(dataMessage.data.status) &&
        dataMessage.data.status == "OK")
    ) {
      var messages = this.handleParseSuccessMessages(dataMessage)
      this.refs.container.success(messages, "Thành công", {
        timeOut: 3000,
        extendedTimeOut: 10000,
      })
    }
    this.props.dispatch(Actions.resetMessages())
  }

  handleParseSuccessMessages(dataMessage) {
    switch (dataMessage.type) {
      case "register-email":
        return `Đăng ký thành công với email: ${
          dataMessage.data.email
        }. Vui lòng kiểm tra email này để nhận mật khẩu đăng nhập!`
        break
      case "reset-password-succes":
        return `Đã gửi mật khẩu thành công. Vui lòng kiểm tra email này để nhận mật khẩu mới!`
        break
      default:
        break
    }

    switch (dataMessage.name) {
      case "RESET_PASSWORD":
        return `Đã gửi mật khẩu thành công. Vui lòng kiểm tra email này để nhận mật khẩu mới!`
        break
      default:
        break
    }

    return `Tác vụ thành công!`
  }

  handleParseErrorMessages(messages) {
    switch (messages) {
      case "username or email is required":
        return "Đề nghị nhập đầy đủ tài khoản và mật khẩu"
        break
      case "login failed":
        return "Tài khoản hoặc mật khẩu không đúng"
        break
      case "email is a required argument":
        return "Đề nghị nhập email"
      case "ValidationError":
        return "Dữ liệu nhập không hợp lệ"
        break
      case "Invalid user":
        Router.push("/login")
        return "Phiên sử dụng đã hết hạn. Vui lòng đăng nhập lại."
        break
      case "Authorization Required":
        return "Phiên đăng nhập trước đã hết hạn. Vui lòng đăng nhập lại."
        break

      default:
        return messages
        break
    }
  }

  handleShowMessage(props) {
    if (props.hasErrored) {
      if (_.isArray(props.hasErrored) && props.hasErrored.length > 0) {
        var title = props.hasErrored[1]
        var subtitle = props.hasErrored[0]
        this.container.error(title, subtitle, {
          timeOut: 5000,
          extendedTimeOut: 10000,
        })
      } else {
        this.container.error("Vui lòng thử lại.", "Đã có lỗi xảy ra", {
          timeOut: 5000,
          extendedTimeOut: 10000,
        })
      }
    }
    if (props.isLoggedIn.length > 0) {
      var title = props.isLoggedIn[1]
      var subtitle = props.isLoggedIn[0]
      this.container.success(title, subtitle, {
        timeOut: 5000,
        extendedTimeOut: 10000,
      })
    }
  }

  render() {
    return (
      <div>
        <ToastContainer
          ref="container"
          toastMessageFactory={ToastMessageFactory}
          className="toast-top-right"
        />
      </div>
    )
  }
}

CustomElementToastIndex.defaultProps = {
  hasErrored: false,
  hasErroredServer: false,
  hasMessages: false,
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.hasErrored,
    hasErroredServer: state.hasErroredServer,
    hasMessages: state.hasMessages,
  }
}

export default connect(mapStateToProps)(CustomElementToastIndex)
