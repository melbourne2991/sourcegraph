package extsvc

import (
	"net/url"
	"strings"

	"github.com/sourcegraph/sourcegraph/internal/api"
)

type CodeHost struct {
	ServiceID   string
	ServiceType string
	BaseURL     *url.URL
}

func NewCodeHost(baseURL *url.URL, serviceType string) *CodeHost {
	return &CodeHost{
		ServiceID:   NormalizeBaseURL(baseURL).String(),
		ServiceType: serviceType,
		BaseURL:     baseURL,
	}
}

func IsHostOf(c *CodeHost, repo *api.ExternalRepoSpec) bool {
	return c.ServiceID == repo.ServiceID && c.ServiceType == repo.ServiceType
}

// NormalizeBaseURL modifies the input and returns a normalized form of the a base URL with insignificant
// differences (such as in presence of a trailing slash, or hostname case) eliminated. Its return value should be
// used for the (ExternalRepoSpec).ServiceID field (and passed to XyzExternalRepoSpec) instead of a non-normalized
// base URL.
func NormalizeBaseURL(baseURL *url.URL) *url.URL {
	baseURL.Host = strings.ToLower(baseURL.Host)
	if !strings.HasSuffix(baseURL.Path, "/") {
		baseURL.Path += "/"
	}
	return baseURL
}
